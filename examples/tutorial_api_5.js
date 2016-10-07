var collection = ee.ImageCollection('LANDSAT/LT5_L1T_32DAY_NDVI');
var filtered2000 = collection.filterDate('2000-01-01', '2000-12-31');
var ndvi = filtered2000.median();

Map.setCenter(-122.44, 37.74, 13);
Map.addLayer(ndvi);