import { FreshContext } from "$fresh/src/server/mod.ts";

export default async function handler(_req: Request, c: FreshContext) {
    return(
        <div>
            Soy layout, 
            <c.Component/>
        </div>
    )
}