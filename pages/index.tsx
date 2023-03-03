import * as React from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { getEvents, MdEvent } from '../lib/events'
import { getMonth } from "../lib/days";
import { CalendarHeader } from "../components/calendarHeader";
import { Month } from "../components/month";
import { useState, useEffect, useContext } from "react";
import GlobalContext from "../context/globalContext";

const GA_TRACKING_ID = "G-KWMLJ6PYMB" // 'G-XXXXX'

const getStringFromArray = (array: string[]): string => {
  return array.reduce((a, c) => a + '/' + c, '').slice(1)
}

const isSameDate = (date1: Date, date2: Date): boolean => {
  return date1.getFullYear() === date2.getFullYear()
     && date1.getMonth() === date2.getMonth()
     && date1.getDate() === date2.getDate();
}

export default function Home({ events, month }: { events: MdEvent[], month: number }) {
  const displayedEvents = events.map(e => {
    return {
      title: e.file.matter.title,
      date: e.file.matter.start.split(' ')[0],
      url: e.file.matter.url,
    }
  })
  const commingEvents = events.filter(e => new Date(e.file.matter.start) > new Date())
  const [listedEvents, setListedEvents] = React.useState<MdEvent[]>(commingEvents)
  const [listTitle, setListTitle] = React.useState(`${month}月 本日以降のライブイベント`)

  const getFileFromTitle = (title: string) => {
    return events.filter(v => v.file.matter.title === title)[0].file
  }

  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);
  
  return (
    <div>
      <Head>
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
            `,
            }}
          />
        </>
        <title>VTuberライブイベントまとめ | TOP</title>
        <meta name="description" content="VTuberのライブイベントをまとめています。今月のライブをカレンダー形式で表示。" />
        <meta property="og:title" content="VTuberライブイベントまとめ | TOP" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://v-event.wedio.jp" />
        <meta property="og:image" content="https://v-event.wedio.jp/img/top.png" />
        <meta property="og:site_name" content="VTuberライブイベントまとめ" />
        <meta property="og:description" content="VTuberのライブイベントをまとめています。今月のライブをカレンダー形式で表示。" />
        <meta name="twitter:card" content="summary" />
      </Head>

      <main>
        <div>
          <div>
            メイカーイベントまとめ
          </div>

          <CalendarHeader />
          <div className="flex flex-1">
            <Month month={currentMonth} />
          </div>

          <div>
            <div>
              <div>
                <div>{listTitle}</div>
                <div>
                  {listedEvents.length > 0 ? listedEvents.map(e => {
                    return (
                      <div key={e.file.id}>
                        <div>
                          <div>
                            <div>{e.file.matter.start}~</div>
                            <div>
                              {e.file.matter.title}
                            </div>
                            <div>出演者: {getStringFromArray(e.file.matter.actors)}</div>
                            <div>場所: {getStringFromArray(e.file.matter.places)}</div>
                          </div>
                          <div>
                            <div>公式ページはこちら</div>
                          </div>
                        </div>
                      </div>
                    )
                  }) : <div>予定されているイベントはないようです (T_T) </div>}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <footer>
        <div>
          <a href='https://forms.gle/jkD83bLYVrRbnCca6'>
            <div>
              お問い合わせ
            </div>
          </a>
        </div>
      </footer>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const month = (new Date()).getMonth() + 1
  const events = await getEvents(month)
  return {
    props: {
      events,
      month
    }
  }
}