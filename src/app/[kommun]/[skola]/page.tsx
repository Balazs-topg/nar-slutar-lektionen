import Bread from "@/app/components/Bread";
import NavigateBtn from "@/app/components/NavigateBtn";
import getUnitGuidFromSkola from "@/app/api/utils/getUnitGuidFromSkola";
// import { revalidatePath } from "next/cache";
import AngeSchemaID from "@/app/components/AngeSchemaID";

export default async function Page({
  params,
}: {
  params: { kommun: string; skola: string };
}) {
  const kommun = params.kommun;
  const skola = params.skola;

  const unitGuid = await getUnitGuidFromSkola(decodeURIComponent(skola));
  console.log("unitGuidddddd", unitGuid);

  async function fetchKlassLista() {
    // revalidatePath("/");
    const response = await fetch(
      "https://web.skola24.se/api/get/timetable/selection",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Scope": "8a22163c-8662-4535-9050-bc5e1923df48",
        },
        body: JSON.stringify({
          hostName: "almhult.skola24.se",
          unitGuid: unitGuid,
          filters: {
            class: true,
            course: false,
            group: false,
            period: false,
            room: false,
            student: false,
            subject: false,
            teacher: false,
          },
        }),
      },
    );
    const data = await response.json();
    return data.data.classes;
  }

  const klassLista = await fetchKlassLista();

  return (
    <div className="flex h-[100dvh] flex-col items-center p-8">
      <Bread kommun={kommun} skola={skola} />
      <AngeSchemaID skola={skola} />
      <div className=" mt-8 flex flex-col items-center gap-2 pb-24">
        <div className=" text-center text-sm opacity-70">
          (OBS, använd helst ditt personliga schema ID, eftersom hemsidan kan
          visa fel när när det finnns överlappande lektioner)
        </div>
        {klassLista.map((item: any, i: number) => {
          return (
            <NavigateBtn
              namn={item.groupName}
              routeName={`./${skola}/${item.groupName}`}
              key={item.groupName}
            />
          );
        })}
      </div>
    </div>
  );
}