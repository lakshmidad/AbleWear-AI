import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AccessibilityProvider, useAccessibility } from './context/AccessibilityContext'
import Navbar from './components/Navbar'
import ProfileBuilder from './components/ProfileBuilder'
import GarmentScanner from './components/GarmentScanner'
import AdaptiveCatalog from './components/AdaptiveCatalog'
import CustomizationPortal from './components/CustomizationPortal'
import VoiceAssistantOverlay from './components/VoiceAssistantOverlay'
import Footer from './components/Footer'

function MainContent() {
  const { currentStep, highContrast, fontSize } = useAccessibility()

  // Font Size class mapping
  const fontSizeClass = fontSize === 'xlarge' 
    ? 'text-xl' 
    : fontSize === 'large' 
      ? 'text-lg' 
      : 'text-base'

  // Framer Motion Animation Variants for smooth step-to-step transitions
  const stepVariants = {
    initial: { opacity: 0, y: 15, scale: 0.99 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: 'easeOut' } },
    exit: { opacity: 0, y: -15, scale: 0.99, transition: { duration: 0.25, ease: 'easeIn' } }
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${
      highContrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'
    } ${fontSizeClass}`}>
      
      {/* Persistent Accessible Navbar & Global Controls */}
      <Navbar />

      {/* Main Wizard Flow with Framer Motion Page Transitions */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4" id="main-content" tabIndex={-1}>
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ProfileBuilder />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step-2"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <GarmentScanner />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step-3"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <AdaptiveCatalog />
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step-4"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <CustomizationPortal />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Hands-Free Voice Assistant HUD */}
      <VoiceAssistantOverlay />

      {/* Persistent Team Footer */}
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <AccessibilityProvider>
      <MainContent />
    </AccessibilityProvider>
  )
}
