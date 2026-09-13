import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AccessibilityProvider, useAccessibility } from './context/AccessibilityContext'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import ProfileBuilder from './components/ProfileBuilder'
import GarmentScanner from './components/GarmentScanner'
import AdaptiveCatalog from './components/AdaptiveCatalog'
import CustomizationPortal from './components/CustomizationPortal'
import MyOrdersPage from './components/MyOrdersPage'
import WizardStepper from './components/WizardStepper'
import OrderTrackingModal from './components/OrderTrackingModal'
import VoiceAssistantOverlay from './components/VoiceAssistantOverlay'
import Footer from './components/Footer'

function MainContent() {
  const { currentStep, setCurrentStep, highContrast, fontSize, setIsTrackingOpen } = useAccessibility()

  // Font Size class mapping
  const fontSizeClass = fontSize === 'xlarge' 
    ? 'text-xl' 
    : fontSize === 'large' 
      ? 'text-lg' 
      : 'text-base'

  // Framer Motion Animation Variants for smooth transitions
  const stepVariants = {
    initial: { opacity: 0, y: 12, scale: 0.99 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, y: -12, scale: 0.99, transition: { duration: 0.2, ease: 'easeIn' } }
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${
      highContrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'
    } ${fontSizeClass}`}>
      
      {/* Single Unified Accessible Navbar */}
      <Navbar />

      {/* Main Content Area with Page Transitions (Max 1200px Clean Layout) */}
      <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 sm:px-6 py-4" id="main-content" tabIndex={-1}>
        {/* Single clean modern progress bar at the top of the Guided Wizard page */}
        {currentStep >= 1 && currentStep <= 4 && (
          <WizardStepper 
            currentStep={currentStep} 
            setCurrentStep={setCurrentStep} 
            highContrast={highContrast} 
          />
        )}

        <AnimatePresence mode="wait">
          {/* Step 0: Creative Adaptive Fashion Landing Page */}
          {currentStep === 0 && (
            <motion.div
              key="landing"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <LandingPage onTrackOrders={() => setCurrentStep(5)} />
            </motion.div>
          )}

          {/* Step 1: Accessibility Profile Builder */}
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

          {/* Step 2: Automated AI Garment Scanner */}
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

          {/* Step 3: Personalized Accessible Catalog & Fit Simulator */}
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

          {/* Step 4: Customization Portal & Local Tailor Dispatch */}
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

          {/* Step 5: Flipkart-Style My Orders & Live Order Tracker */}
          {currentStep === 5 && (
            <motion.div
              key="step-5"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <MyOrdersPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Hands-Free Voice Assistant HUD */}
      <VoiceAssistantOverlay />

      {/* Order Tracking Modal Dialog */}
      <OrderTrackingModal />

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
