import SchemaBuilder from "@pothos/core";

const builder = new SchemaBuilder<{
	Objects: {
		Test1: {
			firstName: string;
			id: string;
			lastName: string;
		};
	};
}>({});

type Test0 = {
	age: number;
	id: string;
	isOk: boolean;
	name: string;
};

const Test0Ref = builder.objectRef<Test0>("Test0");

Test0Ref.implement({
	description: "This is Test0.",
	fields: (t) => ({
		age: t.exposeInt("age"),
		id: t.exposeID("id"),
		isOk: t.exposeBoolean("isOk"),
		name: t.string({
			resolve: (parent) => {
				return parent.name;
			},
		}),
	}),
});

builder.queryType({
	description: "This is Query.",
	fields: (t) => ({
		test0: t.field({
			resolve: () => ({
				age: 1,
				id: "id0",
				isOk: true,
				name: "name0",
			}),
			type: Test0Ref,
		}),
	}),
});

builder.objectType("Test1", {
	description: "This is Test1.",
	fields: (t) => ({
		firstName: t.exposeString("firstName"),
		id: t.exposeID("id"),
		lastName: t.exposeString("lastName"),
	}),
});

builder.queryFields((t) => ({
	test1: t.field({
		resolve: () => ({
			firstName: "firstName1",
			id: "id1",
			lastName: "lastName1",
		}),
		type: "Test1",
	}),
}));
