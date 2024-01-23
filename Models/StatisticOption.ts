type StatisticOptionName = "skaat_played" | "skaat_winned" | "skaat_lost" | "abnat" | "akak" | "akalat" | "moshtary_sun" | "moshtary_hakam" | "moshtrayat_nagha" | "moshtrayat_khasera" | "sra" | "baloot" | "khamsin" | "m2a" | "rb3om2a" | "kababit_sun_count" | "kababit_hakam_count";
interface IStatisticViewData {
    id: StatisticOptionName,
    label: string,
    data: number[]
}
const StatisticOptions: IStatisticViewData[] = [
    { id: "skaat_played", label: "عدد الصكات الملعوبة", data: [] },
    { id: "skaat_winned", label: "عدد الصكات الرابحة", data: [] },
    { id: "skaat_lost", label: "عدد الصكات الخاسرة", data: [] },
    { id: "abnat", label: "الابناط", data: [] },
    { id: "akak", label: "الاكك", data: [] },
    { id: "akalat", label: "الأكلات", data: [] },
    { id: "moshtary_sun", label: "مشترى صن", data: [] },
    { id: "moshtary_hakam", label: "مشترى حكم", data: [] },
    { id: "moshtrayat_nagha", label: "مشتريات ناجحة", data: [] },
    { id: "moshtrayat_khasera", label: "مشتريات خسرانة", data: [] },
    { id: "sra", label: "سرا", data: [] },
    { id: "baloot", label: "بلوت", data: [] },
    { id: "khamsin", label: "خمسين", data: [] },
    { id: "m2a", label: "مية", data: [] },
    { id: "rb3om2a", label: "أربعمية", data: [] },
    { id: "kababit_sun_count", label: "عدد الكبابيت صن", data: [] },
    { id: "kababit_hakam_count", label: "عدد الكبابيت حكم", data: [] },
]
export default StatisticOptions;
