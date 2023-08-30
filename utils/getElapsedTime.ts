function getElapsedTime(inputDate: string): string {
    const inputTime = new Date(inputDate).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - inputTime;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    const postfixes = {
        year: {
            single: "عام",
            double: "عامان",
            pluralize: "أعوام"
        },
        month: {
            single: "شهر",
            double: "شهران",
            pluralize: "أشهر"
        },
        week: {
            single: "أسبوع",
            double: "أسبوعان",
            pluralize: "أسابيع"
        },
        day: {
            single: "يوم",
            double: "يومان",
            pluralize: "أيام"
        },
        hour: {
            single: "ساعة",
            double: "ساعتان",
            pluralize: "ساعات"
        },
        minute: {
            single: "دقيقة",
            double: "دقيقتان",
            pluralize: "دقائق"
        },
        second: {
            single: "ثانية",
            double: "ثانيتان",
            pluralize: "ثوان"
        }
    }

    const constructWord = (num: number,
        objOfPostfixes: {
            single: string,
            double: string,
            pluralize: string
        }): string => {
        if (num === 1)
            return `${objOfPostfixes.single} `
        else if (num === 2)
            return `${objOfPostfixes.double} `
        else if (num > 2 && num <= 10)
            return `${num} ${objOfPostfixes.pluralize} `
        else return `${num} ${objOfPostfixes.single} `
    }
    if (years > 0) {
        return constructWord(years, postfixes.year);
    } else if (months > 0) {
        return constructWord(months, postfixes.month);
    } else if (weeks > 0) {
        return constructWord(weeks, postfixes.week);
    } else if (days > 0) {
        return constructWord(days, postfixes.day);
    } else if (hours > 0) {
        return constructWord(hours, postfixes.hour);
    } else if (minutes > 0) {
        return constructWord(minutes, postfixes.minute);
    } else {
        return constructWord(seconds, postfixes.second);
    }
}

export default getElapsedTime;