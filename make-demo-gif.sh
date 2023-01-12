#!/bin/bash

ffmpeg -i demo.mov -vf "scale=iw*0.25:ih*0.25" -pix_fmt rgb24 -r 5 -f gif - | gifsicle --optimize=3 --delay=3 > demo.gif