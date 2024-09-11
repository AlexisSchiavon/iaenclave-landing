export interface Service {
    name: string;
    packages: Package[];
}

export interface Package {
    name: string;
    features: string[];
}

export interface SetCurrentSectionProps {
    setCurrentSection: (section: string) => void;
}

export interface SetSelectedPackageProps {
    setSelectedPackage: (packageName: string) => void;
}