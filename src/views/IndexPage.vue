<!--
 * @Author: Christer hongweibin3@gmail.com
 * @Date: 2023-10-08 15:46:29
 * @LastEditors: Christer hongweibin3@gmail.com
 * @LastEditTime: 2023-12-17 17:54:20
 * @FilePath: \es-frontend\src\views\IndexPage.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="index-page">
    <a-input-search
      v-model:value="searchText"
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
        <PictureList :picture-list="pictureList" />
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
import { message } from "ant-design-vue";

const route = useRoute();
const router = useRouter();
const activeKey = route.params.category;
const postList = ref([]);
const userList = ref([]);
const pictureList = ref([]);

const searchText = ref(route.query.text || "");

const initSearchParams = {
  type: activeKey,
  text: "",
  pageSize: 10,
  pageNum: 1,
};
/**
 * 加载聚合数据数据
 * @param params 请求参数
 */
const loadAllData = (params: any) => {
  const query = {
    ...params,
    searchText: params.text,
  };
  myAxios.post("/search/page", query).then((res: any) => {
    postList.value = res.postList;
    userList.value = res.userList;
    pictureList.value = res.pictureList;
  });
};
/***
 * 加载单类数据
 * @param params 请求参数
 */
const loadData = (params: any) => {
  const { type } = params;
  if (!type) {
    message.error("请选择分类");
    return;
  }
  const query = {
    ...params,
    searchText: params.text,
  };
  myAxios.post("/search/page", query).then((res: any) => {
    if (type === "post") {
      postList.value = res.dataList;
    } else if (type === "user") {
      userList.value = res.dataList;
    } else if (type === "picture") {
      pictureList.value = res.dataList;
    }
  });
};
// 初始加载参数
const searchParams = ref(initSearchParams);
// 首次请求不加载，靠监听加载
// loadAllData(initSearchParams);

watchEffect(() => {
  searchParams.value = {
    ...initSearchParams,
    text: route.query.text as string,
    type: route.params.category as string,
  };
  loadData(searchParams.value);
});
/**
 * 搜索调用方法
 * @param searchValue 搜索框的值
 */
const onSearch = (searchValue: string) => {
  console.log(searchValue);
  router.push({
    query: {
      ...searchParams.value,
      text: searchValue,
    },
  });
  alert(searchValue);
};

const onTabChange = (key: string) => {
  router.push({
    path: `/${key}`,
    query: searchParams.value,
  });
};
</script>
