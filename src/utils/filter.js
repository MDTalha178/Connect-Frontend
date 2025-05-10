export const filterData = (data, filter_key, filter_query) => {
    return data.filter((item) => {
        return item[filter_key] === filter_query;
    });
};