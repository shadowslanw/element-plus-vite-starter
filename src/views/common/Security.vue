<template lang="pug">
ElForm(
    ref="formRef"
    :model="formState"
    :rules="formRules"
)
    ElFormItem(label="请输入密码" prop="oldPassword")
        ElInput(
            ref="oldPasswordInputRef"
            v-model="formState.oldPassword"
            placeholder=""
        )
    ElFormItem(label="请输入新密码" prop="newPassword")
        ElInput(
            ref="newPasswordInputRef"
            v-model="formState.newPassword"
            placeholder="" 
        )
    ElFormItem(label="再次输入新密码" prop="confirmPassword")
        ElInput(
            ref="confirmPasswordInputRef"
            v-model="formState.confirmPassword"
            placeholder="" 
        )
    ElFormItem
        ElButton(ref="submitBtnRef" data-action="submit" @click="resetWrap") 确认修改
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
import setupSecurityInit from '@/composition/security';

export default defineComponent({
    name: 'Security',
    components: {
        ElForm, ElFormItem, ElInput, ElButton,
    },
    setup() {
        return {
            formRef: ref(),
            ...setupSecurityInit(),
        };
    },
    methods: {
        resetWrap() {
            this.formRef.validate()
                .then(async () => {
                    try {
                        await this.reset();
                    } catch (error) {
                        console.warn(error);
                    }
                })
                .catch((error: any) => {/** do nothing */});
        },
    },
});
</script>

<style lang="scss" scoped></style>