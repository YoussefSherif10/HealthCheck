This is a very simple project where I use Angular to create a SPA at the front end and AN ASP.NET core to create a very basic web API. I used Angular material for styling.

The idea of the project is that it allows you to make some diagnostics to check the health of other servers all you have to do is to write the domain name of that site and the checks will return one of three results: Healthy, Degraded, Unhealthy. 

I only registered one check which is Internet Control Message Protocol (ICMP) this check is also known as PING. the idea is that it sends a packet to that server and waits for the response. If the response comes within a range of an expected time then it is Healthy. if it took time more than the given range then it is Degredaded. If there is an error and the server refuses the packet then it is Unhealthy. 

I used two middlewares. One is to enable CORS to allow the Angular app to talk to the API. The other one is to register the check and create an endpoint so that it is accessible and returns the result. There is also an example of an API Controller. I overridden the base class of the Options of the middleware to modify the response to make it in JSON instead of just true or force and used DI to make it available for the app. to use.

In Angular, I used standalone components and used Lazy loading to route to them.