const xpathView = {
  contentType: '/html/head/meta[@http-equiv="Content-Type"]/@content',
  ocrSystem: '/html/head/meta[@name="ocr-system"]/@content',
  ocrCapabilities: '/html/head/meta[@name="ocr-capabilities"]/@content',
  pages: [
    '//div[@class="ocr_page"]',
    {
      id: './@id',
      title: './@title',
      careas: [
        './div[@class="ocr_carea"]',
        {
          id: './@id',
          title: './@title',
          pars: [
            './p[@class="ocr_par"]',
            {
              id: './@id',
              lang: './attribute::lang',
              lines: [
                './span[@class="ocr_line"]',
                {
                  id: './@id',
                  title: './@title',
                  words: [
                    './span[@class="ocrx_word"]',
                    {
                      id: './@id',
                      title: './@title',
                      content: './text()',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default xpathView
