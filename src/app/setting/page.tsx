'use client'

import { AccountSettings } from "@/components/pages/setting/AccountSettings";
import { PrivateSettings } from "@/components/pages/setting/PrivateSettings";
import { ViewSettings } from "@/components/pages/setting/ViewSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function Setting() {
	return (
		<div className="flex jc">
		<Tabs defaultValue="view" className="flex">
		<TabsList className="flex flex-col">
		<TabsTrigger value="view">Внешний вид</TabsTrigger>
		<TabsTrigger value="account">Профиль</TabsTrigger>
		<TabsTrigger value="private">Приватность</TabsTrigger>
		</TabsList>
		<section>
		<TabsContent value="view"><ViewSettings/></TabsContent>
		<TabsContent value="account"><AccountSettings/></TabsContent>
		<TabsContent value="private"><PrivateSettings/></TabsContent>
		</section>
		</Tabs>
		</div>)
}
