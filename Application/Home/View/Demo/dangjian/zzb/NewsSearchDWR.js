
// Provide a default path to dwr.engine
if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;

if (NewsSearchDWR == null) var NewsSearchDWR = {};
NewsSearchDWR._path = '/system/dwr';
NewsSearchDWR.isSearch = function(callback) {
  dwr.engine._execute(NewsSearchDWR._path, 'NewsSearchDWR', 'isSearch', callback);
}
NewsSearchDWR.isSearch = function(callback) {
  dwr.engine._execute(NewsSearchDWR._path, 'NewsSearchDWR', 'isSearch', false, callback);
}
NewsSearchDWR.isSearchformName = function(p1, callback) {
  dwr.engine._execute(NewsSearchDWR._path, 'NewsSearchDWR', 'isSearchformName', false, p1, callback);
}
NewsSearchDWR.setSession = function(callback) {
  dwr.engine._execute(NewsSearchDWR._path, 'NewsSearchDWR', 'setSession', callback);
}
NewsSearchDWR.setSession = function(callback) {
  dwr.engine._execute(NewsSearchDWR._path, 'NewsSearchDWR', 'setSession', false, callback);
}
