# Hocr to JSON - *WIP*

## WORK IN PROGRESS

Simple tool to convert [.hocr](https://en.wikipedia.org/wiki/HOCR) files to json for further processing

Work in progress, so far tested with [tesseract](https://github.com/tesseract-ocr/tesseract/tree/4.1.0-rc1) output 

## Example result JSON

The result will give some meta information and a representation of the hocr file in json.

<details><summary>Example output</summary>

<p>

```json
{
  "contentType": "text/html;charset=utf-8",
  "ocrCapabilities": "ocr_page ocr_carea ocr_par ocr_line ocrx_word ocrp_wconf",
  "ocrSystem": "tesseract 4.1.0-rc1-752-g8b69",
  "pages": [
    {
      "bbox": [[ 0, 0 ], [ 640, 480 ]],
      "careas": [
        {
          "bbox": [[ 36, 92], [ 618, 361 ]],
          "id": "block_1_1",
          "pars": [
            {
              "id": "par_1_1",
              "lang": "eng",
              "lines": [
                {
                  "baseline": [ 0, -6 ],
                  "bbox": [[ 36, 92 ], [ 580, 122 ]],
                  "id": "line_1_1",
                  "words": [
                    {
                      "bbox": [[ 36, 92 ], [ 96, 116 ]],
                      "content": "This",
                      "id": "word_1_1",
                      "xWconf": 91
                    },
                    {
                      "bbox": [[ 109, 92 ], [ 129, 116 ]],
                      "content": "is",
                      "id": "word_1_2",
                      "xWconf": 92
                    },
                    {
                      "bbox": [[ 141, 98 ], [ 156, 116 ]],
                      "content": "a",
                      "id": "word_1_3",
                      "xWconf": 92
                    },
                    {
                      "bbox": [[ 169, 92 ], [ 201, 116 ]],
                      "content": "lot",
                      "id": "word_1_4",
                      "xWconf": 90
                    },
                    {
                      "bbox": [[ 212, 92 ], [ 240, 116 ]],
                      "content": "of",
                      "id": "word_1_5",
                      "xWconf": 93
                    },
                    // ...
```

</p>

Further example content can be found in [/stub/](/stub/) directory.
</details>
