import { config, fields, collection } from "@keystatic/core";

export default config({
	storage: {
		kind: "github",
    repo: `${REPO_OWNER}/${REPO_NAME}`
	},
	collections: {
		post: collection({
			label: "博文",
			slugField: "title",
			path: "src/content/post/**",
			format: { contentField: "content" },
			schema: {
				title: fields.slug({ name: { label: "标题" } }),
				description: fields.text({ label: "简介", validation: { isRequired: true } }),
				publishDate: fields.date({ label: "发布日期", validation: { isRequired: true } }),
				tags: fields.array(fields.text({ label: "标签" }), {
					label: "标签",
					itemLabel: (props) => props.value ?? "标签",
				}),
				draft: fields.checkbox({ label: "草稿", defaultValue: false }),
				ogImage: fields.text({ label: "OG 图片" }),
				coverImage: fields.object(
					{
						src: fields.image({ label: "封面图片", directory: "public/assets/images" }),
						alt: fields.text({ label: "封面图片 Alt" }),
					},
					{ label: "封面图片" },
				),
				content: fields.mdx({ label: "正文" }),
			},
		}),
		note: collection({
			label: "笔记",
			slugField: "title",
			path: "src/content/note/**",
			format: { contentField: "content" },
			schema: {
				title: fields.slug({ name: { label: "标题" } }),
				description: fields.text({ label: "简介" }),
				publishDate: fields.date({ label: "发布日期", validation: { isRequired: true } }),
				content: fields.mdx({ label: "正文" }),
			},
		}),
	},
});
