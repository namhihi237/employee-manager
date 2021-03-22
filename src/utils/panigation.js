export const panigation = async (table, page, take) => {
    let records = [];
    if (!page) {
        records = await table.findMany({ skip: 0, take });
    } else if (!isNaN(page) && page > 0) {
        const skip = (page - 1) * take;
        records = await table.findMany({ skip, take });
    }
    return records;
};
