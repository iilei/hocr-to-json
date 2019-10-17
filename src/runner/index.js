/* eslint-disable */

import fs from 'fs'

import { transform, prettyPrint } from 'camaro'

const xml = fs.readFileSync('stub/phototest.hocr', 'utf-8')

const template = {
  cache_key: '/HotelListResponse/cacheKey',
  hotels: [
    '//HotelSummary',
    {
      hotel_id: 'hotelId',
      name: 'name',
      rooms: [
        'RoomRateDetailsList/RoomRateDetails',
        {
          rates: [
            'RateInfos/RateInfo',
            {
              currency: 'ChargeableRateInfo/@currencyCode',
              non_refundable: 'boolean(nonRefundable = "true")',
              price: 'number(ChargeableRateInfo/@total)',
            },
          ],
          room_name: 'roomDescription',
          room_type_id: 'roomTypeCode',
        },
      ],
    },
  ],
  session_id: '/HotelListResponse/customerSessionId',
}

const runner = async (task, output) => {
  const result = await transform(xml, template)
  console.log(result)

  const prettyStr = await prettyPrint(xml, { indentSize: 4 })
  console.log(prettyStr)
}

export default runner
