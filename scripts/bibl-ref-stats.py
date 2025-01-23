import os
import shutil
import json

from config import HTML_DIR, HIGHCHARTS_DATA

print("creating data for highcharts drilldown chart")

shutil.rmtree(HIGHCHARTS_DATA, ignore_errors=True)
os.makedirs(HIGHCHARTS_DATA, exist_ok=True)

with open(
    os.path.join(HTML_DIR, "stats", "bibl-books.json"), "r", encoding="utf-8"
) as f:
    bible_books = json.load(f)

books = []
for x in bible_books:
    item = {"name": x[0], "y": x[1], "drilldown": x[0]}
    books.append(item)

with open(
    os.path.join(HTML_DIR, "stats", "bibl-refs.json"), "r", encoding="utf-8"
) as f:
    bible_refs = json.load(f)


bibl_refs_data = {}
for x in bible_refs:
    book = x[0].split(":")[0]
    if book not in bibl_refs_data:
        bibl_refs_data[book] = []
    bibl_refs_data[book].append(x)

drilldown_data = []
for key, value in bibl_refs_data.items():
    item = {}
    item["name"] = key
    item["id"] = key
    item["data"] = value
    drilldown_data.append(item)

series = [
    {
        "name": "Bible Books",
        "colorByPoint": True,
        "data": books,
    }
]

drilldown = {"breadcrumbs": {"position": {"align": "right"}}, "series": drilldown_data}

with open(
    os.path.join(HIGHCHARTS_DATA, "bibl-books-series.json"), "w", encoding="utf-8"
) as f:
    json.dump(series, f, ensure_ascii=False)

with open(
    os.path.join(HIGHCHARTS_DATA, "bibl-books-drilldown.json"), "w", encoding="utf-8"
) as f:
    json.dump(drilldown, f, ensure_ascii=False)

print("Done")
