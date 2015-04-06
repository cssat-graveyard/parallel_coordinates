var county_group = [{
    groupName: "Washington",
    groupCode: "washington"
}, {
    groupName: "Region 1 North",
    groupCode: "region_1-north"
}, {
    groupName: "Region 1 South",
    groupCode: "region_1_south"
}, {
    groupName: "Region 2 North",
    groupCode: "region_2_north"
}, {
    groupName: "Region 2 South",
    groupCode: "region_2_south"
}, {
    groupName: "Region 3 North",
    groupCode: "region_3_north"
}, {
    groupName: "Region 3 South",
    groupCode: "region_3_south"
}];

var Fstr = [
    "Population Under 18",
    "Poverty",
    "Annual Entries",
    "Age 0-4 Entries",
    "Dependency",
    "Reunification",
    "Median Days"
];

var Sstr = [
    "(log scale)",
    "",
    "(per 1,000)",
    "",
    "",
    "within 1 Year",
    "in Care"
];

//also for class name of grid
var fullname = [
    "child_population",
    "poverty_percent",
    "entries",
    "age_entries",
    "dependency_entries",
    "reunification",
    "length_of_stay"
];

var fullname_class = [
    "county",
    "region",
    "child_population",
    "poverty_percent",
    "entries",
    "age_entries",
    "dependency_entries",
    "reunification",
    "length_of_stay"
];

//header name of grid
var fullname_head = [
    "County",
    "Region",
    "Population Under 18",
    "Poverty",
    "Annual Entries per 1,000",
    "Age 0-4 Entries",
    "Dependency",
    "Reunification",
    "Median Days"
];

//title of grid
var fullname_title = [
    "County",
    "Region",
    "Population Under 18",
    "Percent of Population Below Poverty Line",
    "Annual OOH Entries (per 1,000)",
    "Percent of OOH Entries Age 0-4",
    "Percent of OOH Entries with Dependency",
    "Percent of OOH Entries Ending in Reunification within 1 Year",
    "Median Length of Stay in OOH Care (Days)"
];