"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Upload,
    ArrowLeft,
    PlusCircle,
    Building2,
    FileText,
    Calendar,
    AlertCircle,
} from "lucide-react";

export default function RaiseContractPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API execution
        setTimeout(() => {
            setIsLoading(false);
            router.push("/itpo/dashboard");
        }, 1200);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            
            {/* Header / Back Action */}
            <div className="flex items-center justify-between">
                <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => router.push("/itpo/dashboard")}
                    className="gap-2 text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </Button>
                <span className="text-xs text-muted-foreground font-mono">Form Ref: ITPO-CRF-2025</span>
            </div>

            {/* Main Form Card */}
            <Card className="border-border shadow-sm">
                <CardHeader className="bg-primary/5 border-b border-border/60 pb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            <FileText className="h-5 w-5" />
                        </div>
                        <div>
                            <CardTitle className="text-xl font-bold tracking-tight">Raise New Infrastructure Contract</CardTitle>
                            <CardDescription className="text-xs text-muted-foreground">
                                Define maintenance, repairs, or renovations for delegation to NBCC or Shapoorji.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6 pt-6">
                        
                        {/* Title Field */}
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Contract Title
                            </Label>
                            <Input 
                                id="title"
                                placeholder="e.g., Renovation of Convention Hall 3 & 4 Main Stage"
                                required
                                className="focus-visible:ring-primary"
                            />
                        </div>

                        {/* Side-by-Side: Category & Scale */}
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    Work Category
                                </Label>
                                <select 
                                    id="category"
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    required
                                >
                                    <option value="">Select Category...</option>
                                    <option value="civil">General Civil</option>
                                    <option value="mechanical">Mechanical / HVAC</option>
                                    <option value="electrical">Electrical Operations</option>
                                    <option value="plumbing">Plumbing Infrastructure</option>
                                    <option value="amc">AMC / CMC Contract</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="scale" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    Estimated Work Scale
                                </Label>
                                <select 
                                    id="scale"
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    required
                                >
                                    <option value="">Select Scale...</option>
                                    <option value="small">Small Scale (Routine Maintenance)</option>
                                    <option value="medium">Medium Scale (Repair / Overhaul)</option>
                                    <option value="large">Large Scale (Renovation / New Dev)</option>
                                </select>
                            </div>
                        </div>

                        {/* Side-by-Side: Priority & Target Deadline */}
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="priority" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    Priority Level
                                </Label>
                                <select 
                                    id="priority"
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    required
                                >
                                    <option value="">Select Priority...</option>
                                    <option value="low">Low (Routine Improvements)</option>
                                    <option value="medium">Medium (Standard Maintenance)</option>
                                    <option value="high">High (Time Sensitive)</option>
                                    <option value="critical">Critical (Infrastructure Failure)</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="deadline" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    Target Completion Deadline
                                </Label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/70" />
                                    <Input 
                                        id="deadline"
                                        type="date"
                                        required
                                        className="pl-9 focus-visible:ring-primary"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Side-by-Side: Raising Target & Building Location */}
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="raisedFor" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    Contract Raised For
                                </Label>
                                <select 
                                    id="raisedFor"
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    required
                                >
                                    <option value="">Select Allocation...</option>
                                    <option value="nbcc_only">NBCC Only (Direct or Decision PMC)</option>
                                    <option value="both">NBCC & Shapoorji Both (Joint Bidding)</option>
                                    <option value="shapoorji_only">Shapoorji Specific Assignment</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    Building / Site Location
                                </Label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/70" />
                                    <Input 
                                        id="location"
                                        placeholder="e.g. Block B, Hall 3 Foyer, Open Plaza"
                                        required
                                        className="pl-9 focus-visible:ring-primary"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Description Field */}
                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Detailed Scope of Work
                            </Label>
                            <Textarea 
                                id="description"
                                placeholder="Describe technical criteria, dimensions, required certifications, structural specifications..."
                                rows={4}
                                required
                                className="focus-visible:ring-primary"
                            />
                        </div>

                        {/* Document Upload field */}
                        <div className="space-y-2">
                            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Attach Layouts / Technical Specifications
                            </Label>
                            <div className="border-2 border-dashed border-border rounded-lg p-6 bg-card/40 flex flex-col items-center justify-center text-center hover:bg-muted/30 transition-colors relative">
                                <input 
                                    type="file" 
                                    id="fileUpload" 
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    accept=".pdf,.doc,.docx,.jpg,.png"
                                />
                                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                <span className="text-sm font-medium text-foreground">
                                    {fileName ? fileName : "Drag & drop files here, or click to browse"}
                                </span>
                                <span className="text-[10px] text-muted-foreground mt-1">
                                    Supports PDF, DOC, PNG, JPG up to 15MB
                                </span>
                            </div>
                        </div>

                        {/* Safety Disclaimer */}
                        <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-4 flex gap-3 items-start">
                            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                            <div className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
                                <strong>System Notice:</strong> Raising this contract triggers a digital workflow immediately. Depending on your allocation parameter, it will become instantly visible inside NBCC and Shapoorji operation terminals for estimation and engineer assignments.
                            </div>
                        </div>

                    </CardContent>

                    <CardFooter className="border-t border-border/60 pt-6 flex justify-end gap-3">
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => router.push("/itpo/dashboard")}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={isLoading}
                            className="gap-2"
                        >
                            <PlusCircle className="h-4 w-4" />
                            {isLoading ? "Broadcasting Contract..." : "Raise Contract & Distribute"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}