<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/1579315285086.jpg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/1579315282132.jpg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/1579315278207.jpg" alt />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
    </swiper>

    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>

    <!-- <m-card icon="menu1" title="新闻资讯">
      <div class="nav jc-between">
        <div class="nav-item active">
          <div class="nav-link">热门</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">热门</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">热门</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">热门</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">热门</div>
        </div>
      </div>
      <div class="pt-3">
        <swiper>
          <swiper-slide v-for="n in 5" :key="n">
            <div class="py-2 fs-lg" v-for="n in 5" :key="n">
              <span>[新闻]</span>
              <span>|</span>
              <span>夏日新版本即将羽翼打的上限</span>
              <span>06/02</span>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </m-card> -->

    <m-list-card icon="menu1" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <router-link 
        tag="div"
        :to="`/articles/${news._id}`" class="py-2 fs-lg d-flex" v-for="(news,i) in category.newsList" :key="i">
          <span class="text-info">[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
          <!-- fliter -->
          <span class="text-grey-1 fs-sm">{{news.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>

    <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
          <router-link
          tag="div"
          :to="`/heroes/${hero._id}`"
          class="p-2 text-center"
          style="width: 20%;" 
          v-for="(hero, i) in category.heroList" :key="i">
            <img :src="hero.avatar" class="w-100">
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>

    <!-- <m-card icon="menu1" title="英雄列表"></m-card> -->
  </div>
</template>

<script>
//引入dayjs，日期过滤
import dayjs from "dayjs";
export default {
  //P14,过滤日期
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  },
  data() {
    return {
      swiperOption: {
        autoplay: { delay: 3000 },
        pagination: {
          el: ".pagination-home"
        }
      },
      newsCats: [],
      heroCats: []
    };
  },
  methods: {
    //请求后端接口已查询好的数据过来
    async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
    },
    async fetchHeroCats() {
      const res = await this.$http.get("heroes/list");
      this.heroCats = res.data;
    }
  },
  created() {
    this.fetchNewsCats();
    this.fetchHeroCats();
  },
};
</script>

<style lang="scss">
//注意不能整个scss传入，所以一般将变量和实现分离
@import "../assets/scss/_variables.scss";
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>
