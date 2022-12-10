import * as React from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { getEvents, MdEvent } from '../lib/events'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import jaLocale from '@fullcalendar/core/locales/ja'
import { Box, Button, CardActions, Container, Grid } from '@mui/material'
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const GA_TRACKING_ID = "G-KWMLJ6PYMB" // 'G-XXXXX'

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

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
      </Head>

      <main>
        <Container maxWidth='xl'>
          <Typography variant='h3' className='h1' m={5} align='center'>
            VTuberライブイベントまとめ
          </Typography>

          <div>
            <Grid container spacing={4}>
              <Grid item md={6}>
                <Box style={{ position: "sticky", top: "00px" }}>
                  <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    locale={jaLocale}
                    events={displayedEvents}
                    initialView="dayGridMonth"
                    eventContent={(arg) => {
                      return (
                        <div>
                          <HtmlTooltip
                            title={
                              <React.Fragment>
                                <h3>{arg.event.title}</h3>
                                <div>
                                  日時: {getFileFromTitle(arg.event.title).matter.start}~
                                </div>
                                <div>
                                  出演者: {getStringFromArray(getFileFromTitle(arg.event.title).matter.actors).substring(0, 30) + "…"}
                                </div>
                              </React.Fragment>
                            }
                            placement="bottom">
                            <div>{arg.event.title}</div>
                          </HtmlTooltip>
                        </div>
                      )
                    }}
                    dateClick={(arg) => {
                      setListedEvents(events.filter(e => isSameDate(new Date(e.file.matter.start), arg.date)))
                      setListTitle((arg.date.getMonth() + 1) + '月' + arg.date.getDate() + '日のライブイベント')
                    }}
                  />
                </Box>
              </Grid>
              <Grid item md={6}>
                <Typography variant='h4' className='h2' my={2}>{listTitle}</Typography>
                <Grid container spacing={3}>
                  {listedEvents.length > 0 ? listedEvents.map(e => {
                    return (
                      <Grid item xs={12} key={e.file.id}>
                        <Card>
                          <CardContent>
                            <Typography>{e.file.matter.start}~</Typography>
                            <Typography
                              variant='h5'
                              className='h3' 
                              my={2}
                              sx={{
                                fontWeight: 'bold'
                              }}
                            >
                              {e.file.matter.title}
                            </Typography>
                            <Typography mb={2}>出演者: {getStringFromArray(e.file.matter.actors)}</Typography>
                            <Typography>場所: {getStringFromArray(e.file.matter.places)}</Typography>
                          </CardContent>
                          <CardActions>
                            <Button href={e.file.matter.url}>公式サイトはこちら</Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    )
                  }) : <Grid item xs={12}>予定されているイベントはないようです (T_T) </Grid>}
                </Grid>
              </Grid>
            </Grid>

          </div>
        </Container>
      </main>

      <footer>
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