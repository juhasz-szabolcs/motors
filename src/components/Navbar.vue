<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Könyvek</a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Kezdőlap</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/books">Könyvek</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
