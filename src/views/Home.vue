<template>
  <div>
    <div class="row">
      <main class="main col-md-9 ml-sm-auto col-lg-10" role="main">
        <div
          v-if="isLoading"
          class="row justify-content-center align-items-center"
          style="height:100vh"
        >
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <div
          v-else
          class=" justify-content-between full-width align-items-center pt-3 pb-2 mb-3"
        >
          <div class="w-100">
            <h1 v-if="articles.length" class="h2">All Posts</h1>
            <h1 v-else>You have no articles. Add some!</h1>
          </div>
          <div v-if="articles.length" class="table-responsive">
            <table class="table table-sm">
              <thead class="thead-light">
                <tr class="p-2">
                  <th class="inline-block p-2 align-middle" style="width: 10%">
                    #
                  </th>
                  <th class="inline-block p-2 align-middle" style="width: 10%">
                    Title
                  </th>
                  <th class="inline-block p-2 align-middle" style="width: 10%">
                    Author
                  </th>
                  <th class="inline-block p-2 align-middle" style="width: 20%">
                    Tags
                  </th>
                  <th class="inline-block p-2 align-middle" style="width: 25%">
                    Excerpt
                  </th>
                  <th class="inline-block p-2 align-middle" style="width: 25%">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="p-2" v-for="(article, i) in articles" :key="i">
                  <td class="inline-block px-2 py-3 align-middle">
                    {{ pageNumber ? i + 1 + (pageNumber - 1) * 10 : i + 1 }}
                  </td>
                  <td class="inline-block px-2 py-3 align-middle">
                    {{ article.title }}
                  </td>
                  <td class="inline-block px-2 py-3 align-middle">
                    @{{ article.author.username }}
                  </td>
                  <td class="inline-block px-2 py-3 align-middle">
                    <span 
                      >{{ article.tagList.join(', ') }}
                    </span>
                  </td>
                  <td class="inline-block px-2 py-3 align-middle">
                    {{article.body | truncate(20)}}
                  </td>
                  <td class="inline-block px-2 py-3 align-middle last-col">
                    <span
                      class="align middle"
                      >{{presentDate(article.updatedAt)}}</span
                    >
                    <div class="dropdown ml-5 float-right">
                      <button
                        class="btn btn-info dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        ...
                      </button>
                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <router-link
                          :to="{
                            name: 'ROUTE_EDIT_ARTICLE',
                            params: { slug: article.slug }
                          }"
                          class="dropdown-item"
                          >Edit</router-link
                        >
                        <button
                          data-toggle="modal"
                          data-target="#modal"
                          class="dropdown-item"
                          @click="onDeleteAction(article)"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <nav
          class="d-flex jusyify-content-center"
          aria-label="Page navigation"
          v-if="articlesCount > 10"
        >
          <ul class="pagination mx-auto">
            <li class="page-item">
              <router-link
                v-if="canGoBackward"
                class="page-link text-dark"
                :to="{ path: `/articles/page/${pageNumber - 1}` }"
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
              </router-link>
            </li>
            <li v-for="num in pageNumberArray" :key="num" class="page-item ">
              <router-link
                :class="{ 'text-primary': num + 1 == pageNumber }"
                class="page-link text-dark"
                :to="{ path: `/articles/page/${num + 1}` }"
                >{{ num + 1 }}</router-link
              >
            </li>
            <li class="page-item">
              <router-link
                v-if="canGoForward"
                class="page-link text-dark"
                :to="{ path: `/articles/page/${pageNumber + 1}` }"
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
              </router-link>
            </li>
          </ul>
        </nav>
      </main>
    </div>
    <modal-cm ref="articleDeleteModal">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title font-weight-bold" id="modalTitle">
              Delete Article
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="onCloseDeleteModal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Are you sure to delete Article?
          </div>
          <div class="modal-footer">
            <button
              class="btn border px-4"
              type="button"
              @click="onCloseDeleteModal"
              data-dismiss="modal"
            >
              No
            </button>
            <button
              @click="onDeleteArticle"
              type="button"
              class="btn btn-danger px-4"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </modal-cm>
  </div>
</template>

<script>
import { mapState } from "vuex";

import ModalCm from "../components/Modal";

import { HttpService } from "../services/apiService";
import { Endpoints } from "../services/apiService/routes";

export default {
  name: "Home",
  data() {
    return {
      articles: [],
      articlesCount: null,
      isLoading: false
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),
    pageNumber() {
      return this.$route.params.page ? Number(this.$route.params.page) : null;
    },
    totalPageCount() {
      return Math.floor(this.articlesCount / 10) + 1;
    },
    pageNumberArray() {
      return Array.from(Array(this.totalPageCount).keys());
    },
    canGoBackward() {
      return this.pageNumber - 1 > 0;
    },
    canGoForward() {
      return this.pageNumber + 1 <= this.totalPageCount;
    },
    offsetForRequest() {
      return this.pageNumber ? (this.pageNumber - 1) * 10 : 0;
    }
  },
  components: {
    ModalCm
  },
  watch: {
    pageNumber: async function(val) {
      if (val) {
        this.isLoading = true;
        await this.getArticles();
        this.isLoading = false;
      }
    }
  },
  async mounted() {
    try {
      this.isLoading = true;
      await this.getArticles();
      if (this.articlesCount > 10) {
        this.$router.replace({ name: "ROUTE_ARTICLES", params: { page: 1 } });
      }
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      throw error;
    }
  },
  methods: {
    async getArticles() {
      try {
        let response = await HttpService.getRequest(
        Endpoints.get(Endpoints.ROUTE_GET_USER_ARTICLES, {
          username: this.user.username,
          offset: this.offsetForRequest
        })
      );
      this.articles = response.articles;
      this.articlesCount = response.articlesCount;
      } catch (error) {
        throw error;
      }
    },
    onDeleteAction(slug) {
      this.selectedToDeleteSlug = slug;
      this.$refs.articleDeleteModal.open();
    },
    async onDeleteArticle() {
      try {
        this.isLoading = true;
        await HttpService.deleteRequest(
          Endpoints.get(Endpoints.ROUTE_DELETE_ARTICLE, {
            slug: this.selectedToDeleteSlug.slug
          })
        );
        this.$refs.articleDeleteModal.close();
        if(this.articles[0].slug === this.selectedToDeleteSlug.slug && this.pageNumber - 1>0) {
          this.$router.push({ name: "ROUTE_ARTICLES", params: { page: this.pageNumber - 1 } })
          return;
        }
        await this.getArticles();
        this.isLoading = false;
        this.displayNotification('SUCCESS', 'Article deleted successfuly')
      } catch (error) {
        throw error;
      }
    },
    onCloseDeleteModal() {
      this.selectedToDeleteSlug = null;
    },
    presentDate(date) {
      let days = ['Jan', 'Feb', 'Mar', 'Apr', 'May', "Jun", 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      let newDate = new Date(date);
      return days[newDate.getMonth()] + ' ' + newDate.getDay() + ' ,' + newDate.getFullYear();
    }
  }
};
</script>

<style scoped>
@media (min-width: 381px) {
  [role="main"] {
    padding-top: 58px;
  }
}

/* @media (max-width: 550px) {
  .main {
    padding-top: 133px !important;
  }
} */

.bg-grey-light {
  background-color: #dddddd;
}

.teble-responsive {
  display: block;
  width: 100%;
  overflow-x: auto;
}

@media (max-width: 550px) {
.last-col {
  text-align: center;
}

.last-col span {
  white-space: nowrap;
}

.dropdown {
  margin: 11px auto 0 !important;
  display: block;
  float: none !important;
}
}
</style>
