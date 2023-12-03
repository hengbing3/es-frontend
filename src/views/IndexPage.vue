<!--
 * @Author: Christer hongweibing3@gmail.com
 * @Date: 2023-10-08 15:46:29
 * @LastEditors: Christer hongweibing3@gmail.com
 * @LastEditTime: 2023-12-03 22:10:53
 * @FilePath: \es-frontend\src\views\IndexPage.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="index-page">
    <a-input-search
      v-model:value="searchParams.text"
      placeholder="input search text"
      enter-button="Search"
      size="large"
      @search="onSearch"
    />
    <MyDivider />
    <a-tabs v-model:activeKey="activeKey" @change="onTabChange">
      <a-tab-pane key="post" tab="文章">
        <PostList :post-list="postList" />
      </a-tab-pane>
      <a-tab-pane key="picture" tab="图片">
        <PictureList />
      </a-tab-pane>
      <a-tab-pane key="user" tab="用户">
        <UserList :user-list="userList" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import PostList from "@/components/PostList.vue";
import PictureList from "@/components/PictureList.vue";
import UserList from "@/components/UserList.vue";
import MyDivider from "@/components/MyDivider.vue";
import { useRouter, useRoute } from "vue-router";
import myAxios from "@/plugins/myAxios";

const route = useRoute();
const router = useRouter();
const activeKey = route.params.category;
const postList = ref([]);
const userList = ref([]);
const token = ref("");
myAxios
  .post("/user/login", { userAccount: "admin", userPassword: "123456" })
  .then((res) => {
    token.value = res.data;
  });

myAxios
  .post("/post/page", {
    currentPage: 1,
    pageSize: 10,
  })
  .then((res) => {
    postList.value = res.data.records;
  });

myAxios
  .post("/user/page", {
    currentPage: 1,
    pageSize: 10,
  })
  .then((res) => {
    console.log(res.data.records);
    userList.value = res.data.records;
  });

const initSearchParams = {
  text: "",
  pageSize: 10,
  pageNum: 1,
};

const searchParams = ref(initSearchParams);

watchEffect(() => {
  searchParams.value = {
    ...initSearchParams,
    text: route.query.text as string,
  };
});
const onSearch = (searchValue: string) => {
  alert(searchValue);
  router.push({
    query: searchParams.value,
  });
};

const onTabChange = (key: string) => {
  router.push({
    path: `/${key}`,
    query: searchParams.value,
  });
};
</script>
