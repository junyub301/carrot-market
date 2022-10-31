export function cls(...classnames: string[]) {
    return classnames.join(" ");
}

export function moneyFormat(money: number) {
    return money.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export function dateFormat(date: string | Date) {
    return new Intl.DateTimeFormat("kr").format(new Date(date));
}
