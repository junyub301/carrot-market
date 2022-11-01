export function cls(...classnames: string[]) {
    return classnames.join(" ");
}

export function moneyFormat(money: number) {
    return money.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export function dateFormat(date: string | Date) {
    return new Intl.DateTimeFormat("kr").format(new Date(date));
}

export function imageSrc(imageName?: string | null, variant?: string) {
    return imageName
        ? `https://imagedelivery.net/p0F9ZS4dCd2hN10Ig7VfWg/${imageName}/${variant}`
        : "https://imagedelivery.net/p0F9ZS4dCd2hN10Ig7VfWg/a95c472a-0aae-4100-9700-1258c8df5600/avatar";
}
