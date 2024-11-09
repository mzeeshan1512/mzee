'use client'
import Button from "@/shared/components/button";
import FallBackError from "@/shared/layouts/fall-back-layout";
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
      <FallBackError message={error.message || "Oops, Something went wrong!"} code="OOPS">
          <div className="d-flex justify-content-center">
          <Button
            type="button"
            variant="danger"
            outline
            onClick={() => reset()}
          >
            Try again?
          </Button>
          </div>
        </FallBackError>
      </body>
    </html>
  )
}