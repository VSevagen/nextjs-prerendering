import { getFeaturedEvents } from '../helper/api-utils';
import EventList from '../components/events/event-list';

function HomePage(props) {

  const { featuredData } = props;
  return (
    <div>
      <EventList items={featuredData} />
    </div>
  );
}

export async function getStaticProps(context) {
  const featuredData = await getFeaturedEvents();
  return {
    props: {
      featuredData
    },
  }
}

export default HomePage;
