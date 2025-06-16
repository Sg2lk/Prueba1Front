import { FreshContext } from "$fresh/src/server/mod.ts";

export default async function handler(req: Request, c: FreshContext) {
    return(
        <div>
            Soy layout, 
            <c.Component/>
            Lolalolitaa
        </div>
    )
}