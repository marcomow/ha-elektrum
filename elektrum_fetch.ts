export async function fetchDailyConsumption(y: string, m: string, d: string, session: any): Promise<any> {
    const fromDate = `${y}-${m}-${d}`;
    const url = `https://mans.elektrum.lv/lv/majai/mani-parskati/viedo-skaititaju-paterinu-parskats/consumption.json?step=D&fromDate=${fromDate}`;
    const headers = {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-US,en;q=0.9,lv;q=0.8",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
    };

    const response = await fetch(url, { headers, redirect: "manual" });

    if (response.status === 200) {
        return await response.json();
    } else {
        console.log('Something went wrong! HTTP', response.status);
        return null;
    }
}
