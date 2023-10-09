#!/bin/bash

# Set the input and output directories and file names
input_dir="$1"
output_dir="$2"
output_file="$3.mp4"

# Use ffmpeg to create the video from the images in the input directory
ffmpeg -framerate 30 -pattern_type glob -i "$input_dir/*.png" -c:v libx264 -pix_fmt yuv420p "$output_dir/$output_file"
