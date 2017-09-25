# Noveria-Store
A full-Stack online store.

    ***** NOVERIA *****

![alt tag](https://github.com/Edxael/Noveria-Store/blob/master/views/img/01-design/Noveria1.png "Description goes here")

To see this app live: http://noveria.mycode.website/


This project is one online store where users can review items and and purchase them.
the technologies used on this Web-Applications are:

* Node.js
* Express,js
* MongoDB

----

    ---  Edmundo Rubio  ---
Portfolio: www.mycode.website
Resume: www.edmundorubio.site





<div class="container">
  <div class="row">

    <% for (var i = 0; i < products.length; i++) { %>
      <div class="col-md-4">
        <a href="/product/<%= products[i]._id %>">
          <div class="thumbnail">
            <img src="<%= products[i].image %>">
            <div class="caption">
              <h3><%= products[i].name %></h3>
              <p><%= products[i].category.name %></h3>
              <p>$<%= products[i].price %></p>
            </div>
          </div>
        </a>
      </div>
    <% } %>

  </div>
</div>
