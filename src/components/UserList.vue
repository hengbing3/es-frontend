<!--
 * @Author: Christer hongweibing3@gmail.com
 * @Date: 2023-10-10 23:18:41
 * @LastEditors: Christer hongweibing3@gmail.com
 * @LastEditTime: 2023-12-03 22:04:10
 * @FilePath: \es-frontend\src\components\userList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <a-list item-layout="horizontal" :data-source="props.userList">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-card hoverable style="width: 240px">
            <template #cover>
              <img alt="example" :src="girl" />
            </template>
            <a-card-meta :title="item.userName">
              <template #description>{{ item.userProfile }}</template>
            </a-card-meta>
          </a-card>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>
<script setup lang="ts">
import girl from "@/assets/linghua.png";
import { withDefaults, defineProps } from "vue";
interface Props {
  userList: any[];
}
const props = withDefaults(defineProps<Props>(), {
  userList: () => [],
});
</script>
<style scoped>
.my-girl {
  width: 200px;
}
</style>
