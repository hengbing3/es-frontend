<!--
 * @Author: Christer hongweibing3@gmail.com
 * @Date: 2023-10-10 23:18:41
 * @LastEditors: Christer hongweibing3@gmail.com
 * @LastEditTime: 2023-12-03 21:49:15
 * @FilePath: \es-frontend\src\components\PostList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <a-list item-layout="horizontal" :data-source="props.postList">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta :description="item.content">
            <template #title>
              <a href="https://www.antdv.com/">{{ item.title }}</a>
            </template>
            <template #avatar>
              <a-avatar :src="girl" />
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>
<script setup lang="ts">
import girl from "@/assets/linghua.png";
import { withDefaults, defineProps } from "vue";
interface Props {
  postList: any[];
}
const props = withDefaults(defineProps<Props>(), {
  postList: () => [],
});
</script>
<style scoped>
.my-girl {
  width: 200px;
}
</style>
