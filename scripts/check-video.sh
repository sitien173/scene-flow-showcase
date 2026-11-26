#!/usr/bin/env bash
# Downloads a project's video from its release URL to <out.mp4> and checks size, hash, and codec.
# Usage: scripts/check-video.sh projects/<slug> <out.mp4>
set -euo pipefail

die() { echo "check-video: $*" >&2; exit 1; }
[[ $# -eq 2 ]] || die "usage: scripts/check-video.sh projects/<slug> <out.mp4>"
dir="$1"
out="$2"
url="$(jq -r .video.url "$dir/project.json")"
sha="$(jq -r .video.sha256 "$dir/project.json")"
bytes="$(jq -r .video.bytes "$dir/project.json")"

release='^https://github\.com/[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+/releases/download/[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+\.mp4$'
[[ "$url" =~ $release ]] || die "$dir: video.url is not a GitHub release asset: $url"

curl -fsSL --proto '=https' --proto-redir '=https' --max-filesize 209715200 -o "$out" "$url" \
  || die "$dir: download failed: $url"
[[ "$(stat -c %s "$out")" == "$bytes" ]] || die "$dir: size differs from video.bytes"
echo "$sha  $out" | sha256sum -c --quiet - || die "$dir: sha256 differs from video.sha256"
codec="$(ffprobe -v error -select_streams v:0 -show_entries stream=codec_name -of csv=p=0 "file:$out")"
[[ "$codec" == h264 ]] || die "$dir: video codec is $codec, expected h264"
echo "ok $dir"
