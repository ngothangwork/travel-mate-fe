export function groupByDate(items) {
    return items.reduce((groups, item) => {
        const date = item.date?.split("T")[0];
        if (!groups[date]) groups[date] = [];
        groups[date].push(item);
        return groups;
    }, {});
}
