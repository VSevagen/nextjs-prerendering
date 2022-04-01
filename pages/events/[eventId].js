import { Fragment } from 'react';

import { getEventById, getEventPaths } from '../../helper/api-utils';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';

function EventDetailPage(props) {
  const {title, date, location, image, description} = props.data[0];
  return (
    <Fragment>
      <EventSummary title={title} />
      <EventLogistics
        date={date}
        address={location}
        image={image}
        imageAlt={title}
      />
      <EventContent>
        <p>{description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticPaths(context) {
  const eventIds = await getEventPaths();
  const paths = eventIds.map(event => ({params : {eventId: event}}));
  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const data = await getEventById(context.params.eventId);
  return {
    props: {
      data
    }
  }
}

export default EventDetailPage;
