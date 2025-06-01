export const filterData = (data, filter_key, filter_query) => {
    return data.filter((item) => {
        return item[filter_key] === filter_query;
    });
};

export const filterSingledata = (data, filterKey, filter_query) =>{
    const filterIndex = data.findIndex(query => query[filterKey] == filter_query);
    if(filterIndex != -1){
        return data[filterIndex];
    }
    return null;
}