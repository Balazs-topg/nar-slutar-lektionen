import Section from "@/components/layout/Section";

import NavigateBtn from "../../components/NavigateBtn";
import TopNav from "../../components/layout/TopNav";
import fetchSkolor from "./fetchSkolor";

export default async function Page({ params }: { params: { kommun: string } }) {
  const kommun = params.kommun;

  const listOfUnits = await fetchSkolor("almhult.skola24.se");

  return (
    <>
      <TopNav />
      <Section>
        <h2 className="mb-2 text-lg font-medium">Välj din skola:</h2>
        <div className=" flex flex-col gap-2">
          {listOfUnits.map((unit: any) => {
            return (
              <NavigateBtn
                key={0}
                namn={unit.unitId}
                routeName={`${kommun}/${unit.unitId}`}
              />
            );
          })}
        </div>
      </Section>
    </>
  );
}
