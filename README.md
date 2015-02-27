S.O.S.: The SERP Optimization Suite
===================================

Copyright &copy; 2013&ndash;2014  Maximilian Speicher.
The commercial use of this software or derivatives thereof is subject to certain restrictions (until January 1, 2020) and thus not generally permitted. If you would like to use the software or derivatives for commercial purposes, please contact the copyright holder.

----------

The plug-in provided by this repository extends [WaPPU](https://github.com/maxspeicher/wappu-service)&mdash;a tool for split testing based on usability scores--to form *S.O.S.: The SERP<sup>1</sup> Optimization Suite*. S.O.S. can be used to evaluate SERPs based on WaPPU's scores. As soon as the suite detects suboptimal usability scores, it points out potential causes for these and proposes corresponding adjustments to improve the SERP interface.

<sup>1</sup> SERP = search engine results page

## WaPPU: Was that Page Pleasant to Use?

WaPPU is a tool for usability-based A/B testing that enables the prediction of usability scores from user interactions, e.g., *webpage A has a usability of 99 while webpage B has a usability of only 42.* The default configuration is to show a minimal questionnaire before a user leaves the first webpage. The usability score of the second webpage is then predicted based on user interactions alone. This is done by usability models that are trained from users' answers to the questionnaire on webpage one.

## How to use S.O.S.?

1. Set up a WaPPU server, as is explained under https://github.com/maxspeicher/wappu-service.
2. Copy the complete [sos](sos) folder into the *public* directory of your WaPPu server.
3. In your WaPPU server's *views* directory, open *wappu/analysis.jade*.
4. Insert `script(src='/sos/serp-best-practices.js')` right after `script(src='/javascripts/wappu-analysis.js')`.
5. The causes and countermeasures proposed by S.O.S. are now automatically displayed in the dashboard of a WaPPU A/B test, as available under `<endpoint of server>/wappu?projectId=X`, with `X` being your unique project ID.

## How to run the Demo?

1. Set up a MySQL database called *wappu* and create tables using the scripts provided under [demo/db-scripts](demo/db-scripts).
2. Clone my [statistics-utils](https://github.com/maxspeicher/statistics-utils) repository.
3. Enter your database credentials in [statistics-utils/src/main/resources/application.properties](https://github.com/maxspeicher/statistics-utils/blob/master/src/main/resources/application.properties).
4. Deploy the statistics-utils software using `mvn package tomcat:run -Dmaven.tomcat.port=8082`. It now runs under `http://localhost:8082/statistics-utils`.
5. Clone this repository.
6. Enter your database credentials in the second credentials block in [demo/server/db.js](demo/server/db.js).
7. Change host and port of the statistics-utils software in [demo/server/globals.js](demo/server/globals.js) if different from `localhost:8082`.
8. Run wappu-service using `node app`. It now runs under `http://localhost:8081`.
9. The demo project is automatically installed. The dummy interfaces are deployed under `http://localhost:8081/wappu-demo/indexA.html` (with questionnaire) and `indexB.html` (without questionnaire). The corresponding analysis can be found at `http://localhost:8081/wappu?projectId=0`. The demo features a rather simple set-up by only considering the absolute amount of clicks inside the grey box for predicting usability. This is to ensure good prediction quality even with small amounts of data. The demo is also presented in the video referenced below.
10. If you deploy WaPPU with a path different from `localhost:8081` you have to change this path in [demo/server/public/wappu-demo/js/wappu-tracking.js](server/public/wappu-demo/js/wappu-tracking.js).

## Publications

* Maximilian Speicher, Andreas Both, and Martin Gaedke (2014). "Ensuring Web Interface Quality through Usability-based Split Testing". In: *Proc. ICWE*.
* Maximilian Speicher, Andreas Both, and Martin Gaedke (2014). "WaPPU: Usability-based A/B Testing". In: *Proc. ICWE (Demos)*.
