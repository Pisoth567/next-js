import { Model } from "./modal";

export default async function PotosPage({params}: {params: Promise<{id: string}>}) {
    const {id} = await params
    return (
        <Model>
            Photo {id}
        </Model>
    )
}