import LanguagePicker from "@/components/LanguagePicker";
import ThemePicker from "@/components/ThemePicker";
import CardContainer from "@/components/ui/CardContainer";
import ViewContainer from "@/components/ui/ViewContainer";

export default function SettingsScreen() {
	return (
		<ViewContainer>
			<CardContainer>
				<LanguagePicker />
				<ThemePicker />
			</CardContainer>
		</ViewContainer>
	);
}
