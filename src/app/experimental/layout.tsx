interface ExperimentalLayoutProps {
    children: React.ReactNode
}

function ExperimentalLayout({children} : ExperimentalLayoutProps) {
    return (<div className="min-h-screen space-y-4 p-8">{children}</div>)
}

export default ExperimentalLayout