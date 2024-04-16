import Banner from '../Banner/Banner';
import ExtraSection from '../ExtraSection/ExtraSection';
import PopularClasses from '../PopularClasses/PopularClasses';
import PopularInstructors from '../PopularInstructors/PopularInstructors';

const Home = () => {
	return (
		<div>
			<Banner></Banner>
			<PopularClasses></PopularClasses>
			<PopularInstructors></PopularInstructors>
			<ExtraSection></ExtraSection>
		</div>
	);
};

export default Home;
