import FeaturedProperties from '@/components/FeaturedProperties/FeaturedProperties'
import Hero from '@/components/Hero/Hero'
import HomeProperties from '@/components/HomeProperties/HomeProperties'
import InfoBoxes from '@/components/InfoBoxes/InfoBoxes'

const HomePage = () => {
	return (
		<>
			<Hero />
			<InfoBoxes />
			<FeaturedProperties />
			<HomeProperties />
		</>
	)
}

export default HomePage