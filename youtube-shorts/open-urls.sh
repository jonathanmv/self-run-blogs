while read -r line; do
  open "$line"
  sleep 1
done < "$1"