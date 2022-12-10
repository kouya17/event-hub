import * as React from 'react';
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { getEvents, MdEvent } from '../lib/events'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja'
import { Box, Container, Grid } from '@mui/material'
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

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

const getStringFromArray = (array: string[]) => {
  return array.reduce((a, c) => a + '/' + c, '').slice(1)
}

export default function Home({ events }: { events: MdEvent[] }) {
  const displayedEvents = events.map(e => {
    return {
      title: e.file.matter.title,
      date: e.file.matter.start.split(' ')[0],
      url: e.file.matter.url,
    }
  })
  const commingEvents = events.filter(e => new Date(e.file.matter.start) > new Date())

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
        <Container>
          <h1>
            VTuberライブイベントまとめ
          </h1>

          <div>
            <Grid container spacing={4}>
              <Grid item md={6}>
                <Box style={{ position: "sticky", top: "00px" }}>
                  <FullCalendar
                    plugins={[dayGridPlugin]}
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
                            placement="top">
                            <div>{arg.event.title}</div>
                          </HtmlTooltip>
                        </div>
                      )
                    }}
                  />
                </Box>
              </Grid>
              <Grid item md={6}>
                <h2>12月 本日以降のライブイベント</h2>
                <Grid container spacing={3}>
                  {commingEvents.map(e => {
                    return (
                      <Grid item xs={12} key={e.file.id}>
                        <Card>
                          <CardActionArea href={e.file.matter.url}>
                            <CardContent>
                              <div>{e.file.matter.start}~</div>
                              <h3>{e.file.matter.title}</h3>
                              <Typography mb={2}>出演者: {getStringFromArray(e.file.matter.actors)}</Typography>
                              <Typography mb={1}>場所: {getStringFromArray(e.file.matter.places)}</Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    )
                  })}
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
  const events = await getEvents()
  return {
    props: {
      events
    }
  }
}